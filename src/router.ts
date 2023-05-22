import { Router } from "express";
import { body } from "express-validator";
import { getOneProduct, getProducts } from "./handlers/product";
import { handleInputsErrors } from "./modules/middleware";

const router = Router();

// Product

router.get("/product", getProducts);
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputsErrors,
  (req, res) => {}
);
router.post("/product", body("name").isString(), handleInputsErrors, () => {});
router.delete("/product/:id", () => {});

// Update

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional().isString(),
  () => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  () => {}
);
router.delete("/update/:id", () => {});

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
