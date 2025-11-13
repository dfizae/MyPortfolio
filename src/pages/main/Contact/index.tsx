import ContactForm from "./ContactForm";

export default function Contact(){
    return(
        <>
            <section className="w-full flex flex-col gap-16 justify-center items-center min-h-screen bg-slate-200">
                    <h1 className="text-6xl font-bold text-slate-900">📞 Contacts</h1>
                    <div className="w-full px-8 flex justify-center">
                        <ContactForm />
                </div>
             </section>
        </>
    );
}