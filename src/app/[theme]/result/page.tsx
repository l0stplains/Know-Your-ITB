

export default function Result({ params }: { params: { theme: string } }) {



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Ini Result Page-nya Know Your {params.theme}</div>
    </main>
  );
}


