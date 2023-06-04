import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/updates";
import { handleInputsErrors } from "./modules/middleware";

const router = Router();

// Product

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputsErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputsErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

// Update

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional().isString(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

// Update Points

router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updtaeId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
