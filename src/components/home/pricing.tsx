'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';

export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with CELPIP practice',
      features: [
        '5 speaking evaluations per day',
        '5 writing evaluations per day',
        'Unlimited reading & listening practice',
        'Basic progress tracking',
        'Community support',
        'Mobile app access'
      ],
      popular: false,
      cta: 'Get Started Free',
      href: '/auth/signup'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Advanced features for serious test preparation',
      features: [
        'Unlimited AI evaluations',
        'Advanced analytics & insights',
        'Personalized study plans',
        'Priority support',
        'Export progress reports',
        'Custom practice sets',
        'Exam simulation mode',
        'Vocabulary builder'
      ],
      popular: true,
      cta: 'Start Pro Trial',
      href: '/auth/signup?plan=pro'
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'per month',
      description: 'Complete preparation suite with expert guidance',
      features: [
        'Everything in Pro',
        '1-on-1 expert consultation',
        'Custom study materials',
        'Advanced AI models',
        'Priority queue for evaluations',
        'Detailed performance analysis',
        'Study group access',
        'Guaranteed score improvement'
      ],
      popular: false,
      cta: 'Start Premium Trial',
      href: '/auth/signup?plan=premium'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you need more features. All plans include our core CELPIP practice tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-primary shadow-xl scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80'}`}
                  size="lg"
                >
                  <Link href={plan.href}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              All Plans Include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Core Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• AI-powered evaluation</li>
                  <li>• Progress tracking</li>
                  <li>• Mobile responsive design</li>
                  <li>• Offline practice mode</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 24/7 community support</li>
                  <li>• Comprehensive help center</li>
                  <li>• Video tutorials</li>
                  <li>• Email support</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Money-back guarantee:</strong> Not satisfied? Get a full refund within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
