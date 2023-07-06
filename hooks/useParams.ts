import { useRouter } from "next/router";

export const useParams = () => {
    const router = useRouter();
    console.log(router);
    const { id } = router.query;
    console.log(id);
    return id;
}
