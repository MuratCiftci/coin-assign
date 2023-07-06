import { useRouter } from "next/router";

export const useParams = () => {
    const router = useRouter();
    const { id } = router.query;
    return id;
}
