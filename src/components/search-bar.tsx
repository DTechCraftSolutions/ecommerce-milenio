"use client";

import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ISearchBar {
    categories?: any[]
}

export function SearchBar({ categories }: ISearchBar) {
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    return (
        <div className="w-full px-4 lg:px-0">
            <div className="relative">
                <div className="relative flex items-center">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        type="text"
                        className="w-full h-12 pl-12 pr-4 rounded-full outline-none bg-white shadow-sm border border-gray-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="O que você está procurando?"
                        onKeyDown={(e) => e.key === "Enter" && search !== "" && router.push(`/pesquisa/${search}`)}
                    />
                    <IoSearch className="absolute left-4 text-xl text-gray-400" />
                    <button
                        onClick={() => {
                            if (search !== "") {
                                router.push(`/pesquisa/${search}`)
                            }
                        }}
                        className="absolute right-2 h-8 px-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300"
                    >
                        Buscar
                    </button>
                </div>

                <AnimatePresence>
                    {isFocused && categories && categories.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                        >
                            <div className="p-3">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Categorias populares</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.slice(0, 6).map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => router.push(`/categoria/${category.id}`)}
                                            className="text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
