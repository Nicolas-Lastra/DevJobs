import useRouter from "../hooks/useRouter";

export default function Route({ path, component: Component }) {
    const { currentPath } = useRouter()
    if (currentPath !== path) return null

    return <Component/>
}