"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useResumeData } from "@/hooks/useResumeData";

interface NetworkNode {
    id: string;
    label: string;
    x: number;
    y: number;
    type: "router" | "switch" | "server" | "pc";
    ip: string;
    subnet: string;
    status: "online" | "offline";
}

interface Connection {
    from: string;
    to: string;
    protocol: string;
}

const initialNodes: NetworkNode[] = [
    { id: "router1", label: "Core Router", x: 50, y: 15, type: "router", ip: "10.0.0.1", subnet: "255.255.255.0", status: "online" },
    { id: "switch1", label: "Switch VLAN10", x: 25, y: 45, type: "switch", ip: "10.0.10.1", subnet: "255.255.255.0", status: "online" },
    { id: "switch2", label: "Switch VLAN20", x: 75, y: 45, type: "switch", ip: "10.0.20.1", subnet: "255.255.255.0", status: "online" },
    { id: "server1", label: "Linux Server", x: 15, y: 75, type: "server", ip: "10.0.10.10", subnet: "255.255.255.0", status: "online" },
    { id: "server2", label: "SAP Server", x: 35, y: 75, type: "server", ip: "10.0.10.20", subnet: "255.255.255.0", status: "online" },
    { id: "pc1", label: "Workstation", x: 65, y: 75, type: "pc", ip: "10.0.20.100", subnet: "255.255.255.0", status: "online" },
    { id: "pc2", label: "Admin PC", x: 85, y: 75, type: "pc", ip: "10.0.20.101", subnet: "255.255.255.0", status: "online" },
];

const connections: Connection[] = [
    { from: "router1", to: "switch1", protocol: "Trunk" },
    { from: "router1", to: "switch2", protocol: "Trunk" },
    { from: "switch1", to: "server1", protocol: "Access" },
    { from: "switch1", to: "server2", protocol: "Access" },
    { from: "switch2", to: "pc1", protocol: "Access" },
    { from: "switch2", to: "pc2", protocol: "Access" },
];

const nodeColors: Record<string, string> = {
    router: "#00d4ff",
    switch: "#a855f7",
    server: "#10b981",
    pc: "#f59e0b",
};

const nodeIcons: Record<string, string> = {
    router: "⊕",
    switch: "⇌",
    server: "▣",
    pc: "▢",
};

export default function NetworkDemo() {
    const { ui } = useResumeData();
    const [nodes, setNodes] = useState(initialNodes);
    const [selected, setSelected] = useState<NetworkNode | null>(null);
    const [pingResult, setPingResult] = useState<string[]>([]);
    const [isPinging, setIsPinging] = useState(false);
    const [traceroute, setTraceroute] = useState<string[]>([]);

    const findNode = useCallback((id: string) => nodes.find((n) => n.id === id), [nodes]);

    const toggleNode = (id: string) => {
        setNodes((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, status: n.status === "online" ? "offline" : "online" } : n
            )
        );
    };

    const simulatePing = (targetId: string) => {
        setIsPinging(true);
        setPingResult([]);
        setTraceroute([]);

        const target = findNode(targetId);
        if (!target) return;

        const results: string[] = [];
        results.push(`$ ping ${target.ip}`);
        results.push(`PING ${target.ip} (${target.ip}): 56 data bytes`);

        let step = 0;
        const interval = setInterval(() => {
            if (step >= 4) {
                clearInterval(interval);
                results.push(`--- ${target.ip} ping statistics ---`);
                if (target.status === "online") {
                    results.push(`4 packets transmitted, 4 received, 0% packet loss`);
                } else {
                    results.push(`4 packets transmitted, 0 received, 100% packet loss`);
                }
                setPingResult([...results]);
                setIsPinging(false);
                return;
            }
            if (target.status === "online") {
                const ms = Math.floor(Math.random() * 15) + 1;
                results.push(`64 bytes from ${target.ip}: icmp_seq=${step} ttl=64 time=${ms}ms`);
            } else {
                results.push(`Request timeout for icmp_seq ${step}`);
            }
            setPingResult([...results]);
            step++;
        }, 400);
    };

    const simulateTraceroute = (targetId: string) => {
        const target = findNode(targetId);
        if (!target) return;

        setTraceroute([]);
        setPingResult([]);
        setIsPinging(true);

        const hops: string[] = [`$ traceroute ${target.ip}`, `traceroute to ${target.ip}, 30 hops max`];

        // Find path through network
        const path = findPath("router1", targetId);
        let step = 0;

        const interval = setInterval(() => {
            if (step >= path.length) {
                clearInterval(interval);
                setIsPinging(false);
                return;
            }
            const hop = findNode(path[step]);
            if (hop) {
                const ms = Math.floor(Math.random() * 10) + 1;
                hops.push(`  ${step + 1}  ${hop.ip}  ${ms}ms  ${hop.label}`);
            }
            setTraceroute([...hops]);
            step++;
        }, 500);
    };

    const findPath = (fromId: string, toId: string): string[] => {
        // Simple BFS for demo
        const visited = new Set<string>();
        const queue: { id: string; path: string[] }[] = [{ id: fromId, path: [fromId] }];

        while (queue.length > 0) {
            const { id, path } = queue.shift()!;
            if (id === toId) return path;
            if (visited.has(id)) continue;
            visited.add(id);

            connections
                .filter((c) => c.from === id || c.to === id)
                .forEach((c) => {
                    const next = c.from === id ? c.to : c.from;
                    if (!visited.has(next)) queue.push({ id: next, path: [...path, next] });
                });
        }
        return [fromId, toId];
    };

    return (
        <section id="demo" className="section-padding relative">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">{ui.demo.sectionLabel}</p>
                        <h2 className="section-title">{ui.demo.sectionTitle}</h2>
                        <p className="section-subtitle mx-auto">{ui.demo.subtitle}</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="glass-card overflow-hidden">
                        <div className="grid lg:grid-cols-5">
                            {/* Network topology */}
                            <div className="lg:col-span-3 p-6 relative" style={{ minHeight: 400 }}>
                                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                                    {ui.demo.topology}
                                </h4>

                                <svg className="w-full h-80" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
                                    {/* Connections */}
                                    {connections.map((conn) => {
                                        const from = findNode(conn.from);
                                        const to = findNode(conn.to);
                                        if (!from || !to) return null;
                                        const bothOnline = from.status === "online" && to.status === "online";
                                        return (
                                            <g key={`${conn.from}-${conn.to}`}>
                                                <line
                                                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                                    stroke={bothOnline ? "rgba(0,212,255,0.25)" : "rgba(255,95,87,0.2)"}
                                                    strokeWidth="0.3"
                                                    strokeDasharray={bothOnline ? "none" : "1,1"}
                                                />
                                                <text
                                                    x={(from.x + to.x) / 2}
                                                    y={(from.y + to.y) / 2 - 1.5}
                                                    textAnchor="middle"
                                                    fill="rgba(255,255,255,0.2)"
                                                    fontSize="2"
                                                >
                                                    {conn.protocol}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Nodes */}
                                    {nodes.map((node) => (
                                        <g
                                            key={node.id}
                                            className="cursor-pointer"
                                            onClick={() => setSelected(node)}
                                        >
                                            <circle
                                                cx={node.x} cy={node.y} r={node.type === "router" ? 5 : 3.5}
                                                fill={node.status === "online" ? `${nodeColors[node.type]}15` : "rgba(255,95,87,0.1)"}
                                                stroke={node.status === "online" ? nodeColors[node.type] : "#ff5f57"}
                                                strokeWidth="0.4"
                                            />
                                            {node.status === "online" && (
                                                <circle cx={node.x} cy={node.y} r={node.type === "router" ? 6 : 4.5}
                                                    fill="none" stroke={nodeColors[node.type]} strokeWidth="0.15" opacity="0.3">
                                                    <animate attributeName="r" from={node.type === "router" ? "5" : "3.5"} to={node.type === "router" ? "8" : "6"} dur="2s" repeatCount="indefinite" />
                                                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                                                </circle>
                                            )}
                                            <text x={node.x} y={node.y + 0.8} textAnchor="middle" fill="white" fontSize="2.8" fontWeight="bold">
                                                {nodeIcons[node.type]}
                                            </text>
                                            <text x={node.x} y={node.y + (node.type === "router" ? 9 : 7)} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="2.2">
                                                {node.label}
                                            </text>
                                            <text x={node.x} y={node.y + (node.type === "router" ? 11.5 : 9.5)} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="1.8" fontFamily="monospace">
                                                {node.ip}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>

                            {/* Control panel */}
                            <div className="lg:col-span-2 border-l border-white/5 flex flex-col">
                                {/* Node detail */}
                                <div className="p-5 border-b border-white/5">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{ui.demo.nodeInspector}</h4>
                                    {selected ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-white font-semibold">{selected.label}</span>
                                                <button
                                                    onClick={() => toggleNode(selected.id)}
                                                    className={`text-xs px-2 py-1 rounded-lg font-mono ${selected.status === "online"
                                                        ? "bg-[#10b981]/10 text-[#10b981]"
                                                        : "bg-red-500/10 text-red-400"
                                                        }`}
                                                >
                                                    {selected.status.toUpperCase()}
                                                </button>
                                            </div>
                                            <div className="text-xs text-gray-500 space-y-1 font-mono">
                                                <div>IP: <span className="text-gray-300">{selected.ip}</span></div>
                                                <div>Mask: <span className="text-gray-300">{selected.subnet}</span></div>
                                                <div>Type: <span className="text-gray-300">{selected.type}</span></div>
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                <button
                                                    onClick={() => simulatePing(selected.id)}
                                                    disabled={isPinging}
                                                    className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors disabled:opacity-50 font-semibold"
                                                >
                                                    Ping
                                                </button>
                                                <button
                                                    onClick={() => simulateTraceroute(selected.id)}
                                                    disabled={isPinging}
                                                    className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-[#a855f7]/10 text-[#a855f7] hover:bg-[#a855f7]/20 transition-colors disabled:opacity-50 font-semibold"
                                                >
                                                    Traceroute
                                                </button>
                                                <button
                                                    onClick={() => toggleNode(selected.id)}
                                                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors font-semibold"
                                                >
                                                    Toggle
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600">{ui.demo.topology}</p>
                                    )}
                                </div>

                                {/* Terminal output */}
                                <div className="flex-1 p-5">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{ui.demo.terminalOutput}</h4>
                                    <div className="bg-[#0d1117] rounded-lg p-3 h-48 overflow-y-auto font-mono text-[11px] space-y-0.5">
                                        {(pingResult.length > 0 ? pingResult : traceroute.length > 0 ? traceroute : [`$ # ${ui.demo.ready}`]).map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={
                                                    line.startsWith("$")
                                                        ? "text-gray-500"
                                                        : line.includes("timeout") || line.includes("100%")
                                                            ? "text-red-400"
                                                            : line.includes("bytes") || line.includes("0%")
                                                                ? "text-[#10b981]"
                                                                : "text-gray-400"
                                                }
                                            >
                                                {line}
                                            </motion.div>
                                        ))}
                                        {isPinging && (
                                            <motion.span
                                                className="inline-block w-1.5 h-3 bg-[#00d4ff]"
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer note */}
                        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-gray-500">
                                <span className="text-[#00d4ff] font-semibold">{ui.demo.skillsDemo}:</span> {ui.demo.ccnaSkills}
                            </p>
                            <span className="text-[10px] text-gray-600 font-mono">{ui.demo.conceptual}</span>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
