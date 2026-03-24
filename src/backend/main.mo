import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Nat32 "mo:core/Nat32";
import Time "mo:core/Time";
import Nat8 "mo:core/Nat8";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type Product = {
    id : Nat32;
    name : Text;
    description : Text;
    price : Nat32;
    imageUrl : Text;
    category : ProductCategory;
    sizes : [Nat8];
    stock : Nat32;
    featured : Bool;
  };

  type ProductCategory = {
    #menShoes;
    #womenShoes;
    #kidsShoes;
  };

  type CartItem = {
    productId : Nat32;
    size : Nat8;
    quantity : Nat32;
  };

  type Order = {
    id : Text;
    items : [CartItem];
    total : Nat32;
    timestamp : Int;
  };

  type CartId = Text;

  public type UserProfile = {
    name : Text;
  };

  // State
  let products = Map.empty<Nat32, Product>();
  let carts = Map.empty<CartId, List.List<CartItem>>();
  let orders = Map.empty<Principal, List.List<Order>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextProductId = 1;
  var nextOrderId = 1;

  // Mixins & Modules
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Helper function to verify cart ownership
  func verifyCartOwnership(caller : Principal, cartId : CartId) {
    let callerText = caller.toText();
    if (cartId != callerText) {
      Runtime.trap("Unauthorized: Can only access your own cart");
    };
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Catalog
  public shared ({ caller }) func createProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let productId = Nat32.fromNat(nextProductId);
    let newProduct : Product = {
      product with
      id = productId;
    };
    products.add(productId, newProduct);
    nextProductId += 1;
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    if (products.get(product.id) == null) { Runtime.trap("Product not found. ") };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat32) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (products.get(productId) == null) { Runtime.trap("Product not found. ") };
    products.remove(productId);
  };

  public query ({ caller }) func getProduct(productId : Nat32) : async Product {
    switch (products.get(productId)) {
      case (?product) { product };
      case (null) { Runtime.trap("Product not found. ") };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.category == category
      }
    );
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.featured;
      }
    );
  };

  // Shopping Cart
  public shared ({ caller }) func addItemToCart(cartId : CartId, item : CartItem) : async () {
    verifyCartOwnership(caller, cartId);

    let cart = getUserCart(cartId);

    // Check stock availability
    let product = switch (products.get(item.productId)) {
      case (?p) { p };
      case (null) { Runtime.trap("Product not found. ") };
    };

    if (item.quantity > product.stock) {
      Runtime.trap("Not enough stock available for product. ");
    };

    cart.add(item);
    carts.add(cartId, cart);
  };

  public shared ({ caller }) func removeItemFromCart(cartId : CartId, productId : Nat32, size : Nat8) : async () {
    verifyCartOwnership(caller, cartId);

    switch (carts.get(cartId)) {
      case (null) { Runtime.trap("Cart not found.") };
      case (?cart) {
        let filteredCartItems = cart.filter(
          func(item) { item.productId != productId or item.size != size }
        );
        carts.add(cartId, filteredCartItems);
      };
    };
  };

  public query ({ caller }) func getCart(cartId : CartId) : async [CartItem] {
    verifyCartOwnership(caller, cartId);

    switch (carts.get(cartId)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public shared ({ caller }) func clearCart(cartId : CartId) : async () {
    verifyCartOwnership(caller, cartId);

    switch (carts.get(cartId)) {
      case (null) { () };
      case (_) {
        carts.remove(cartId);
      };
    };
  };

  // Checkout & Orders
  public shared ({ caller }) func placeOrder(cartId : CartId) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous orders are not supported. ");
    };

    verifyCartOwnership(caller, cartId);

    var total : Nat32 = 0;
    let newOrderItems : List.List<CartItem> = List.empty();
    let orderId = nextOrderId.toText();

    // Calculate total and update stock
    switch (carts.get(cartId)) {
      case (null) { Runtime.trap("Cart is empty. Cannot place order. ") };
      case (?cart) {
        cart.forEach(func(item) { total += item.quantity });
        cart.forEach(func(item) { newOrderItems.add(item) });
        cart.clear();
        carts.remove(cartId);
      };
    };
    let newOrder : Order = {
      id = orderId;
      items = newOrderItems.toArray();
      total;
      timestamp = Time.now();
    };

    switch (orders.get(caller)) {
      case (null) {
        let userOrders = List.empty<Order>();
        userOrders.add(newOrder);
        orders.add(caller, userOrders);
      };
      case (?userOrders) {
        userOrders.add(newOrder);
      };
    };
    nextOrderId += 1;
    orderId;
  };

  public query ({ caller }) func getUserOrders(user : Principal) : async [Order] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own orders");
    };

    switch (orders.get(user)) {
      case (?orders) { orders.toArray() };
      case (null) { [] };
    };
  };

  // Helper Functions
  func getUserCart(cartId : CartId) : List.List<CartItem> {
    switch (carts.get(cartId)) {
      case (null) {
        let cart = List.empty<CartItem>();
        carts.add(cartId, cart);
        cart;
      };
      case (?cart) { cart };
    };
  };
};
