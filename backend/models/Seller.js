import mongoose from 'mongoose'

const sellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Seller', sellerSchema)

