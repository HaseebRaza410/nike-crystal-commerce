import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, CreditCard, Truck, ShoppingBag, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Navbar } from '@/components/Navbar';

const steps = [
  { id: 1, name: 'Shipping', icon: MapPin },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: ShoppingBag },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: '',
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      clearCart();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex flex-col items-center justify-center text-center px-4">
          <div className="glass-card p-12 max-w-md">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some items to proceed to checkout</p>
            <Link to="/" className="btn-glow inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-12 max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-emerald-500" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order #: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <Link to="/" className="btn-glow inline-block">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    animate={{
                      scale: currentStep === step.id ? 1.1 : 1,
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'glass-card bg-primary/20 border-primary/50'
                        : 'glass-panel opacity-50'
                    }`}
                  >
                    <step.icon className={`w-5 h-5 ${
                      currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className="hidden md:inline text-sm font-medium">{step.name}</span>
                  </motion.div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 md:w-20 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6 md:p-8"
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Truck className="w-6 h-6 text-primary" />
                      Shipping Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="Doe"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <input
                          type="text"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="123 Street Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Postal Code</label>
                        <input
                          type="text"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6 md:p-8"
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-primary" />
                      Payment Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={paymentInfo.expiry}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                            className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVC</label>
                          <input
                            type="text"
                            value={paymentInfo.cvc}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})}
                            className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Name on Card</label>
                        <input
                          type="text"
                          value={paymentInfo.nameOnCard}
                          onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                          className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/50"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 glass-panel rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your payment information is secure and encrypted
                      </p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6 md:p-8"
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                      Review Order
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-4 glass-panel rounded-xl">
                          <div className="w-20 h-20 rounded-lg bg-muted/30">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.selectedSize} | Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="glass-panel p-4 rounded-xl">
                        <h3 className="font-medium mb-2">Shipping To</h3>
                        <p className="text-sm text-muted-foreground">
                          {shippingInfo.firstName} {shippingInfo.lastName}<br />
                          {shippingInfo.address}<br />
                          {shippingInfo.city}, {shippingInfo.postalCode}
                        </p>
                      </div>
                      <div className="glass-panel p-4 rounded-xl">
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p className="text-sm text-muted-foreground">
                          •••• •••• •••• {paymentInfo.cardNumber.slice(-4) || '4242'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`btn-glass flex items-center gap-2 ${
                    currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="btn-glow flex items-center gap-2"
                >
                  {currentStep === 3 ? 'Place Order' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-emerald-500">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-gradient-glow">${(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
