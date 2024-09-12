import RecipeDetailComponent from "@/app/ui/recipe";

export default function Page({ params }: { params: { id: string } }) {
  return (<RecipeDetailComponent id={params.id} />);
}