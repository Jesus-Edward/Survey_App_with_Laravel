export default function PageComponent({title, button= "", children}) {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="flex justify-between item-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    {button}
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Your content */}
                    {children}
                </div>
            </main>
        </div>
    );
}
