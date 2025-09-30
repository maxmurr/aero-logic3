import { useQuery } from "@tanstack/react-query";
import { fetchRiddleById } from "./riddle-adapter";

export const useRiddleById = (id: string) => {
    const { data } = useQuery({
        queryKey: ['riddle', id],
        queryFn: () => fetchRiddleById(id),
    });

    return { data };
}
