export const getCurrentPlan = (
  hasStarterPlan: boolean,
  hasStandardPlan: boolean,
  hasPremiumPlan: boolean
) => {
  if (hasStarterPlan) {
    return "Starter Plan";
  }

  if (hasStandardPlan) {
    return "Standard Plan";
  }

  if (hasPremiumPlan) {
    return "Premium Plan";
  }

  return;
};
