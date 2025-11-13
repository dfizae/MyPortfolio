import ContactForm from "./ContactForm";

export default function Contact(){
    return(
        <>
            <section className="w-full flex flex-col gap-8 lg:gap-16 justify-center items-center min-h-screen bg-slate-200 p-4 md:py-24">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 text-center">📞 Contacts</h1>
                    <div className="w-full md:px-8 flex justify-center">
                        <ContactForm />
                </div>
             </section>
        </>
    );
}