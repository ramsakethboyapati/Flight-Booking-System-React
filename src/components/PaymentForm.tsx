
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, Wallet, Lock } from 'lucide-react';

interface PaymentFormProps {
  totalPrice: number;
  onComplete: () => void;
  onBack: () => void;
}

const formSchema = z.object({
  paymentMethod: z.enum(["creditCard", "paypal", "googlePay"]),
  cardholderName: z.string().min(2, { message: "Cardholder name is required" }).optional(),
  cardNumber: z.string().min(16, { message: "Valid card number is required" }).optional(),
  expiryDate: z.string().min(5, { message: "Expiry date is required" }).optional(),
  cvv: z.string().min(3, { message: "CVV is required" }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PaymentForm: React.FC<PaymentFormProps> = ({ totalPrice, onComplete, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "creditCard",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });
  
  const watchPaymentMethod = form.watch("paymentMethod");
  
  const handleSubmit = (data: FormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Payment Details</CardTitle>
        <CardDescription>
          Complete your booking by providing payment information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="creditCard" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit/Debit Card
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="paypal" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center">
                            <Wallet className="mr-2 h-4 w-4" />
                            PayPal
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="googlePay" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center">
                            <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor">
                              <path d="M12 24c6.6274 0 12-5.3726 12-12S18.6274 0 12 0 0 5.3726 0 12s5.3726 12 12 12z"/>
                              <path d="M9.5 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5c.97 0 1.78.35 2.35.95l-1.09 1.09c-.32-.25-.71-.4-1.26-.4-.93 0-1.7.77-1.7 1.85s.77 1.85 1.7 1.85c.66 0 1.18-.29 1.46-.76.17-.28.25-.52.27-.8H9.5V11h2.85c.06.36.1.71.1 1.05 0 .79-.23 1.59-.77 2.15-.61.61-1.43.92-2.45.92M18 12c0 .28-.05.48-.14.66-.15.3-.42.5-.78.5-.56 0-.95-.44-.95-1.05 0-.6.39-1.05.95-1.05.36 0 .63.2.78.5.09.18.14.38.14.66m-.8 2.98c0-.46.33-.8.77-.8.43 0 .77.34.77.8 0 .46-.34.8-.77.8-.44 0-.77-.34-.77-.8M14.25 15.5v-5h1.98c1.05 0 1.98.54 1.98 1.74 0 .65-.32 1.23-.83 1.5L19 15.5h-1.33l-1.38-1.75h-.37V15.5h-1.67z"/>
                              <path d="M15.92 12.65c.42 0 .83-.3.83-.74s-.4-.67-.83-.67h-.29v1.41h.29z" fill="white"/>
                            </svg>
                            Google Pay
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {watchPaymentMethod === "creditCard" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name as it appears on the card" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="XXXX XXXX XXXX XXXX" 
                          {...field} 
                          onChange={(e) => {
                            // Format card number with spaces after every 4 digits
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 16) value = value.slice(0, 16);
                            const valueFormatted = value.replace(/(.{4})/g, '$1 ').trim();
                            field.onChange(valueFormatted);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            {...field} 
                            onChange={(e) => {
                              // Format expiry date as MM/YY
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length > 4) value = value.slice(0, 4);
                              if (value.length > 2) {
                                value = `${value.slice(0, 2)}/${value.slice(2)}`;
                              }
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="XXX" 
                            {...field} 
                            onChange={(e) => {
                              // Only allow 3-4 digits for CVV
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length > 4) value = value.slice(0, 4);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base fare</span>
                <span>${(totalPrice * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes & fees</span>
                <span>${(totalPrice * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>Total price</span>
                <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 my-2">
              <Lock className="h-4 w-4 mr-2" />
              <span>Your payment information is secure and encrypted</span>
            </div>
            
            <CardFooter className="flex justify-between px-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Complete Payment"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
