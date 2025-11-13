import ContactForm from "./ContactForm";

export default function Contact(){
    return(
        <>
            <section className="w-full flex flex-col gap-16 justify-center items-center pb-24">
                    <h1 className="text-6xl font-bold">📞 Contacts</h1>
                    <div className="w-full px-8 flex justify-center">
                        <ContactForm />
                </div>
             </section>
        </>
    );
}