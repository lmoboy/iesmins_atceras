import { usePage } from '@inertiajs/react';
export function Debug(props: { vars?: Record<string, unknown> } = {}) {
    const page = usePage<InertiaPageProps>();
    const vars = props.vars ?? page.props;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                zIndex: 999999,
                overflowY: 'scroll',
                maxHeight: '50vh',
            }}
            className="bg-opacity-50 bg-black p-4"
        >
            {Object.entries(vars).map(([key, value]) => (
                <div key={key}>
                    <pre className="text-sm text-white">
                        {key} = {JSON.stringify(value, null, 2)}
                    </pre>
                </div>
            ))}
        </div>
    );
}
