import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Loader2, Plus, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { ProductCategory } from "../backend.d";
import {
  useAllProducts,
  useCreateProduct,
  useDeleteProduct,
  useIsAdmin,
  useUpdateProduct,
} from "../hooks/useQueries";
import { CATEGORY_LABELS } from "../lib/sampleData";

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: ProductCategory.menShoes,
  imageUrl: "",
  featured: false,
  sizes: new Uint8Array([7, 8, 9, 10, 11]),
  stock: 0,
};

export default function AdminPage() {
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: products = [], isLoading } = useAllProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(EMPTY_PRODUCT);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openCreate = () => {
    setEditingProduct(null);
    setForm(EMPTY_PRODUCT);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({ ...product });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ ...form, id: editingProduct.id });
        toast.success("Product updated");
      } else {
        await createProduct.mutateAsync({ ...form, id: Date.now() });
        toast.success("Product created");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct.mutateAsync(productId);
      toast.success("Product deleted");
      setDeleteConfirm(null);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (checkingAdmin) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-electric" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center gap-4"
        data-ocid="admin.error_state"
      >
        <Shield className="w-16 h-16 text-white/10" />
        <h2 className="font-display font-bold text-2xl text-white">
          Access Restricted
        </h2>
        <p className="text-white/40 text-center max-w-sm">
          You need admin privileges to access this page. Please log in with an
          admin account.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background" data-ocid="admin.page">
      {/* Header */}
      <div className="relative overflow-hidden bg-black border-b border-white/8 py-12">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-electric" />
              <p className="text-electric text-[11px] font-bold tracking-[0.2em] uppercase">
                Management
              </p>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-electric" />
              Admin Dashboard
            </h1>
            <p className="text-white/40 mt-1 text-sm">
              Manage your product catalog
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-electric hover:bg-electric/90 text-black font-bold gap-2 rounded-full"
                onClick={openCreate}
                data-ocid="admin.open_modal_button"
              >
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-lg bg-card border-white/10 text-white"
              data-ocid="admin.dialog"
            >
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="name" className="text-white/60">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. Speed Pro X"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                    data-ocid="admin.name_input"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white/60">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Product description..."
                    rows={3}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                    data-ocid="admin.textarea"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-white/60">
                      Price (₹)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          price: Number.parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="0"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                      data-ocid="admin.price_input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-white/60">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={form.stock}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          stock: Number.parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="0"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                      data-ocid="admin.stock_input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category" className="text-white/60">
                    Category
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, category: v as ProductCategory }))
                    }
                  >
                    <SelectTrigger
                      className="bg-white/5 border-white/10 text-white"
                      data-ocid="admin.category_select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value={ProductCategory.menShoes}>
                        Men's Shoes
                      </SelectItem>
                      <SelectItem value={ProductCategory.womenShoes}>
                        Women's Shoes
                      </SelectItem>
                      <SelectItem value={ProductCategory.kidsShoes}>
                        Kids' Shoes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="imageUrl" className="text-white/60">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, imageUrl: e.target.value }))
                    }
                    placeholder="https://..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                    data-ocid="admin.imageurl_input"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={form.featured}
                    onCheckedChange={(v) =>
                      setForm((f) => ({ ...f, featured: v }))
                    }
                    data-ocid="admin.featured_switch"
                  />
                  <Label className="text-white/60">Featured product</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="border-white/15 text-white/60 hover:text-white"
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-electric hover:bg-electric/90 text-black font-bold"
                  onClick={handleSubmit}
                  disabled={createProduct.isPending || updateProduct.isPending}
                  data-ocid="admin.save_button"
                >
                  {createProduct.isPending || updateProduct.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {editingProduct ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-16" data-ocid="admin.loading_state">
            <Loader2 className="w-8 h-8 animate-spin text-electric mx-auto" />
          </div>
        ) : (
          <div
            className="bg-card rounded-xl border border-white/8 overflow-hidden"
            data-ocid="admin.table"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-white/8 hover:bg-white/2">
                  <TableHead className="text-white/40">Product</TableHead>
                  <TableHead className="text-white/40">Category</TableHead>
                  <TableHead className="text-white/40">Price</TableHead>
                  <TableHead className="text-white/40">Stock</TableHead>
                  <TableHead className="text-white/40">Featured</TableHead>
                  <TableHead className="text-right text-white/40">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-12 text-white/25"
                      data-ocid="admin.empty_state"
                    >
                      No products yet. Add your first product!
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product, idx) => (
                    <TableRow
                      key={product.id}
                      className="border-white/5 hover:bg-white/3"
                      data-ocid={`admin.row.${idx + 1}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover bg-secondary"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-sm text-white">
                              {product.name}
                            </p>
                            <p className="text-xs text-white/35 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="text-xs border-white/15 text-white/50"
                        >
                          {CATEGORY_LABELS[product.category] ||
                            product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-white">
                        ₹{product.price.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-white/60">
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        {product.featured ? (
                          <Badge className="bg-electric text-black text-xs border-0">
                            Yes
                          </Badge>
                        ) : (
                          <span className="text-white/25 text-xs">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(product)}
                            className="text-white/40 hover:text-white hover:bg-white/8"
                            data-ocid={`admin.edit_button.${idx + 1}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Dialog
                            open={deleteConfirm === product.id}
                            onOpenChange={(o) => !o && setDeleteConfirm(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/30 hover:text-sale hover:bg-sale/10"
                                onClick={() => setDeleteConfirm(product.id)}
                                data-ocid={`admin.delete_button.${idx + 1}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              className="bg-card border-white/10"
                              data-ocid="admin.dialog"
                            >
                              <DialogHeader>
                                <DialogTitle className="text-white">
                                  Delete Product
                                </DialogTitle>
                              </DialogHeader>
                              <p className="text-white/40 text-sm">
                                Are you sure you want to delete{" "}
                                <strong className="text-white">
                                  {product.name}
                                </strong>
                                ? This action cannot be undone.
                              </p>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setDeleteConfirm(null)}
                                  className="border-white/15 text-white/60 hover:text-white"
                                  data-ocid="admin.cancel_button"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDelete(product.id)}
                                  disabled={deleteProduct.isPending}
                                  data-ocid="admin.confirm_button"
                                >
                                  {deleteProduct.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                  ) : null}
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
}
