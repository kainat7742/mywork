const features = [
  {
    icon: "🎓",
    title: "Expert Tutors",
    description: "Learn from qualified tutors from top universities.",
  },
  {
    icon: "👤",
    title: "1-on-1 Sessions",
    description: "Get personalized attention and learn at your own pace.",
  },
  {
    icon: "▣",
    title: "Affordable Pricing",
    description: "Quality education that fits your budget.",
  },
];

export default function WhyLearn() {
  return (
    <section className="px-7 pt-10">
      <div className="overflow-hidden rounded-[15px] bg-gradient-to-b from-[#b9dcff] via-[#1688ed] to-[#0078e8] px-4 py-4 shadow-md">
        <h2 className="mb-4 text-[20px] font-bold text-white">Why Learn?</h2>

        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/20 text-[12px] text-white">
                {feature.icon}
              </div>

              <div className="pt-[1px]">
                <h3 className="text-[16px] font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-[2px] max-w-[220px] text-[10px] leading-[10px] text-white/90">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
