const plans = [
  {
    title: "Basic",
    price: "$15 /hr",
    features: [
      "1-on-1 Sessions",
      "Expert Tutors",
      "Resource Access",
    ],
    popular: false,
  },
  {
    title: "Standard",
    price: "$25 /hr",
    features: [
      "10+ Sessions",
      "Expert Tutors",
      "Resource Access",
    ],
    popular: true,
  },
  {
    title: "Premium",
    price: "$40 /hr",
    features: [
      "1-on-1 Sessions",
      "Expert Tutors",
      "Resource Access",
    ],
    popular: false,
  },
];

export default function DarkPricing() {
  return (
    <section className="bg-[#222222] px-5 py-8">

      

      <div className="text-center">
        <h2 className="text-[20px] font-bold text-white">
          Affordable Pricing Plans
        </h2>

        <p className="mt-2 text-[11px] text-gray-400">
          Choose the plan that fits your learning goals.
        </p>
      </div>

   

      <div className="mt-6 space-y-4">

        {plans.map((plan) => (

          <div
            key={plan.title}
            className={`relative rounded-xl border p-4 ${
              plan.popular
                ? "bg-[#0D7EFF] border-[#0D7EFF]"
                : "bg-gray-500 border-gray-500"
            }`}
          >

            {plan.popular && (
              <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-[#FFD86A] px-3 py-1 text-[10px] font-semibold text-black">
                Most Popular
              </div>
            )}

            <h3 className="text-xs font-bold text-white">
              {plan.title}
            </h3>

            <p className="mt-1 text-sm font-bold text-white">
              {plan.price}
            </p>

            <ul className="mt-4 space-y-2">

              {plan.features.map((item) => (

                <li
                  key={item}
                  className="flex items-center gap-2 text-[11px] text-white"
                >
                  <span>⚪</span>

                  {item}
                </li>

              ))}

            </ul>

            <button
              className={`mt-5 w-full rounded-lg py-2 text-sm hover:bg-blue-400 hover:text-white font-semibold transition ${
                plan.popular
                  ? "bg-white text-blue-500"
                  : "border border-[#6b8fcf] text-white"
              }`}
            >
              Select {plan.title}
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}