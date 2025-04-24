import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for beginners",
      price: "$0",
      period: "per month",
      features: [
        "3 short videos per month",
        "All platforms supported (TikTok, YouTube, Instagram)",
        "Basic content generation",
        "Standard processing time"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Standard",
      description: "Best for regular creators",
      price: "$30",
      period: "per month",
      features: [
        "25 short videos per month",
        "All platforms supported (TikTok, YouTube, Instagram)",
        "Advanced content generation",
        "Priority processing",
        "Basic analytics"
      ],
      buttonText: "Subscribe Now",
      buttonVariant: "default" as const,
      highlighted: true
    },
    {
      name: "Premium",
      description: "For professional creators",
      price: "$50",
      period: "per month",
      features: [
        "55 short videos per month",
        "All platforms supported (TikTok, YouTube, Instagram)",
        "Premium content generation",
        "Express processing",
        "Advanced analytics",
        "Dedicated support"
      ],
      buttonText: "Go Premium",
      buttonVariant: "default" as const
    }
  ];

  return (
    <section className="w-full py-12 bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Choose Your Perfect Plan
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Select the plan that best fits your content creation needs with our transparent pricing options.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col ${plan.highlighted ? 'border-purple-400 shadow-lg shadow-purple-100' : ''}`}
            >
              <CardHeader className="flex flex-col space-y-1.5">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-baseline font-bold">
                  <span className="text-4xl">{plan.price}</span>
                  <span className="ml-1 text-sm text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include platform-specific content generation for TikTok, YouTube Shorts, and Instagram Reels.
            <br />
            Need a custom plan? <a href="#" className="font-medium text-purple-600 hover:underline">Contact us</a> for enterprise options.
          </p>
        </div>
      </div>
    </section>
  );
}