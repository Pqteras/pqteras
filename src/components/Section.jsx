
function Section({ title, text }) {
    return(
        <>
            <section className='flex self-start w-full flex-col items-start mt-5'>
            <div className="flex items-center w-full">
                <h2 className="mr-3 text-2xl font-semibold">
                {title}
                </h2>
                <div className="flex-grow h-[2px] rounded-full bg-black/20 dark:bg-white/20" />
            </div>
            <p className="mt-[10px]">
                {text}
            </p>
            </section>
        </>
    )
}
export default Section