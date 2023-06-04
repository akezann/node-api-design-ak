import prisma from "../db";

export const getOneUpdate = async (req: any, res: any) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const getUpdates = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.updates];
  }, []);

  if (!updates)
    res.json({message: "no updates"})

  res.json({ data: updates });
};

export const createUpdate = async (req: any, res: any) => {
  const product: any = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    return res.json({ message: "no product here" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  console.log(update)

  res.json({ data: update });
};

export const updateUpdate = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "cant update" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "cant delete" });
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deletedUpdate });
};
