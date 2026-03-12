import dynamic from "next/dynamic";

const ResumeContent = dynamic(() => import("./ResumeContent"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
            <div className="text-white text-lg">Loading resume...</div>
        </div>
    ),
});

export default function ResumePage() {
    return <ResumeContent />;
}
