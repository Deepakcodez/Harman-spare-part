import { FC } from "react"

export const Privacy:FC = () => {
  return (
    <div className="w-full text-justify">
        <h1>Last updated on Aug 12th 2024</h1>
        <div className="flex flex-col gap-2 text-xs ">

            <p>This privacy policy sets out how HARMAN DAVID uses and protects any information that you give HARMAN DAVID when you visit their website and/or agree to purchase from them.</p>

            <p>HARMAN DAVID is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.</p>

            <p>HARMAN DAVID may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you adhere to these changes.</p>
        </div>
        <div>
            <h1 className="my-2 font-semibold ">We may collect the following information:</h1>
            <ul className="list-disc list-inside mb-4  text-pretty text-justify text-xs flex flex-col gap-2 ">
                <li>Name</li>
                <li>Contact information including email address</li>
                <li>Demographic information such as postcode, preferences and interests, if required</li>
                <li>Other information relevant to customer surveys and/or offers</li>
            </ul>
        </div>

        <div>
            <h1 className="my-2 font-semibold ">What we do with the information we gather</h1>
            <h1 className="my-2 ">We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</h1>
            <ul className="list-disc list-inside mb-4  text-pretty text-justify text-xs flex flex-col gap-2 ">
                <li>Internal record keeping.</li>
                <li>We may use the information to improve our products and services.</li>
                <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
            </ul>
            <p className="text-xs">We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.</p>
        </div>

        <div>
            <h1 className="my-2 font-semibold ">How we use cookies</h1>
            <ul className=" mb-4  text-pretty text-justify text-xs flex flex-col gap-2 ">
                <li>A cookie is a small file which asks permission to be placed on your computer&apos;s hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</li>
                <li>We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</li>
                <li>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</li>
                <li>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</li>
            </ul>
        </div>

        <div>
            <h1 className="my-2 font-semibold ">Controlling your personal information</h1>
            <h1 className="my-2 text-xs ">You may choose to restrict the collection or use of your personal information in the following ways:</h1>
            <ul className="list-disc list-inside mb-4  text-pretty text-justify text-xs flex flex-col gap-2 ">
                <li>whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
                <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at</li>
            </ul>
            <p className="mb-3 text-xs">We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</p>
            <p className="text-xs">If you believe that any information we are holding on you is incorrect or incomplete, please write to Ladhewali road Jalandhar  PUNJAB 144006 . or contact us at or as soon as possible. We will promptly correct any information found to be incorrect.</p>
        </div>
    </div>
  )
}