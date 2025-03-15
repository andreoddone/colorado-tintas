const Sale = require('../models/Venda');

exports.syncSales = async (req, res) => {
  try {
    const unsyncedSales = await Sale.find({ isSynced: false });
    await Sale.updateMany({ _id: { $in: unsyncedSales.map(s => s._id) } }, { isSynced: true });
    res.status(200).json({ message: "Vendas sincronizadas!" });
  } catch (error) {
    res.status(500).json({ error: "Falha na sincronização" });
  }
};
