import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TermsAndConditions } from "../_Components/termsPages/Terms"
import { ContactUs } from "../_Components/termsPages/ContactUs"
import { Cancelation } from "../_Components/termsPages/Cancelation"
import { ShippingAndDelivery } from "../_Components/termsPages/ShippingAndDelivery"
import { Privacy } from "../_Components/termsPages/Privacy"


const Terms = () => {

  return (
    <>
      <div className="h-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Terms and Conditions</AccordionTrigger>
            <AccordionContent>

              <TermsAndConditions />

            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Contac us</AccordionTrigger>
            <AccordionContent>
              <ContactUs />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Cancellation and Refund Policy
            </AccordionTrigger>
            <AccordionContent>
              <Cancelation />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Privacy Policy        </AccordionTrigger>
            <AccordionContent>
              <Privacy />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Shipping and Delivery Policy        </AccordionTrigger>
            <AccordionContent>
              <ShippingAndDelivery/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
export default Terms