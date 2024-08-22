import {CheckProvider} from "@/utils";
import TestScale from "@/components/TestScale";

export default function TestProvider({ params }: { params: { theme: string } }) {

  CheckProvider({params})

  return (
    <main className="">
     <TestScale theme={params.theme} /> 
    </main>
  );
}
