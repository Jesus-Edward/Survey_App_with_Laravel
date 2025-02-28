import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({meta, links, onPageClick}) {

    const onClick = (ev, link) => {
        ev.preventDefault();

        if (!link.url) {
            return;
        }
        onPageClick(link)
    }

    return (
        <div
            className="flex items-center justify-between border-t border-gray-200
         bg-white px-4 py-3 sm:px-6 shadow-md mt-4"
        >
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    onClick={(ev) => onClick(ev, links[0])}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    onClick={(ev) => onClick(ev, links[links.length - 1])}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span>{" "}
                        to <span className="font-medium">{meta.to}</span> of{" "}
                        <span className="font-medium">{meta.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    {meta.total > meta.per_page && (<nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    >
                        <a href="#">
                            <span className="sr-only">Previous</span>
                        </a>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                        {links.map((link, ind) => (
                            <a
                                key={ind}
                                href="#"
                                aria-current="page"
                                className={
                                    "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50 " +
                                    (ind === 0 ? "rounded-l-md " : "") +
                                    (ind === links.length - 1
                                        ? "rounded-r-md "
                                        : "") +
                                    (link.active
                                        ? "border-indigo-500 bg-indigo-50 text-indigo-600 "
                                        : "")
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                onClick={(ev) => onClick(ev, link)}
                            ></a>
                        ))}

                        <a href="#">
                            <span className="sr-only">Next</span>
                        </a>
                    </nav>
                    )}
                </div>
            </div>
        </div>
    );
}
