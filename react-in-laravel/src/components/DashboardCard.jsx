export default function DashboardCard({
    title,
    children,
    styles = "",
    className = "",
}) {
    return (
        <div
            className={
                " bg-white shadow-md p-3 flex " +
                " text-center flex-col animate-fade-in-down " +
                className
            }
            style={styles}
        >
            {title && <h3 className="text-2xl font-semibold">{title}</h3>}
            {children}
        </div>
    );
}
