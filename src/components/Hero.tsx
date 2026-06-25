const BG_IMAGE = "https://cdn.poehali.dev/projects/1217ed65-88cc-409e-96ee-8322a5f64a63/bucket/bbf3e4bd-35fb-4902-88c6-5b5969deac45.jpg"

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt="Паркетная карта Крыма"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-center text-white mb-4 drop-shadow-lg">
            {"Укладка паркета и ламината"}
          </p>
          <h1 className="text-6xl font-medium text-balance text-center text-white mb-0 tracking-tight leading-[0.95] lg:text-8xl drop-shadow-xl">
            {"Паркетные работы в Крыму"}
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-center text-white mt-6 font-normal drop-shadow-lg">
            {"Идеальный пол в вашем доме"}
          </p>
        </div>
      </div>
    </section>
  )
}
