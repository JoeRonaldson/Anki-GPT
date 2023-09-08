// Cost Calculation Function

// Define a type for a model pricing entry
interface PricingEntry {
  promptCost: number;
  completionCost: number;
}

// Define the type for the pricing list
interface PricingList {
  [key: string]: PricingEntry;
}

const PRICINGLIST: PricingList = {
  'gpt-4-0613': {
    promptCost: 0.03, // per 1000 tokens
    completionCost: 0.06, // per 1000 tokens
  },
};

export function costCalc(promtTokens: number, completionTokens: number, modelName: string): number {
  // Calculates cost of OpenAi api request depending on number of tokens used

  // Make sure modelName exists in pricingList before proceeding
  if (!PRICINGLIST.hasOwnProperty(modelName)) {
    throw new Error(`Model name ${modelName} not found in pricing list.`);
  }
  const promtUnitCost = PRICINGLIST[modelName].promptCost / 1000;
  const completionUnitCost = PRICINGLIST[modelName].completionCost / 1000;

  const promtCost = promtTokens * promtUnitCost;
  const completionCost = completionTokens * completionUnitCost;

  return promtCost + completionCost;
}
