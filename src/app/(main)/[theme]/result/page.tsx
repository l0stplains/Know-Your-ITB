import Result from "@/components/Result";
import { CheckProvider } from "@/utils";

export default function ResultProvider({ params }: { params: { theme: string } }) {

  CheckProvider({params})

  return (
    <main className="">
      <Result theme={params.theme} />
    </main>
  );
}


