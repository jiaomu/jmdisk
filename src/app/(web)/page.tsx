import { Hero } from "@/components/hero";
import { ResourceList } from "@/components/resource";

export const revalidate = 60;

export default function Home() {
	return (
		<>
			<Hero />
			<ResourceList />
		</>
	);
}
