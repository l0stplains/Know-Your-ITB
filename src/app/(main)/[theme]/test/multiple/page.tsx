import {CheckProvider} from "@/utils";
import TestMultiple from "@/components/TestMultiple";

export default function TestProvider({ params }: { params: { theme: string } }) {

  CheckProvider({params})

  return (
    <main className="">
     <TestMultiple theme={params.theme} /> 
    </main>
  );
}
