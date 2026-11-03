import { Router } from "express";
import { createProducto, getProducto, getProductos, updateProducto, deleteProducto } from "../controllers/producto.controller.js";
const router = Router();

router.get('/producto/:id', getProducto);
router.get('/productos', getProductos);
router.post('/producto', createProducto);

router.put('/producto/:id', updateProducto);
router.delete('/producto/:id', deleteProducto);

export default router;