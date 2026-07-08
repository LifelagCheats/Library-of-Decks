import pc from "picocolors";

import rawCards from "@/data/cards.json";
import { CardsSchema } from "@/schemas/card.schema";

function validateCards() {
  const result = CardsSchema.safeParse(rawCards);

  if (result.success) {
    console.log(pc.green("✓ Card database validated successfully."));
    return result.data;
  }

  const grouped = new Map<string, typeof result.error.issues>();

  for (const issue of result.error.issues) {
    const card = String(issue.path[0]);

    if (!grouped.has(card)) {
      grouped.set(card, []);
    }

    grouped.get(card)!.push(issue);
  }

  console.error();
  console.error(pc.red("❌ Card validation failed"));
  console.error(pc.dim("────────────────────────────────────────────"));

  for (const [card, issues] of grouped) {
    console.error();
    console.error(pc.cyan(`📄 ${card}`));

    for (const issue of issues) {
      const field = issue.path.slice(1).join(".");

      console.error(
        `  ${pc.yellow("•")} ${pc.bold(field)}`
      );

      console.error(
        `    ${pc.red(issue.message)}`
      );

      if ("expected" in issue) {
        console.error(
          `    ${pc.dim(`Expected: ${String(issue.expected)}`)}`
        );
      }

      if ("received" in issue) {
        console.error(
          `    ${pc.dim(`Received: ${String(issue.received)}`)}`
        );
      }

      if ("values" in issue) {
        console.error(
          `    ${pc.dim(`Allowed: ${issue.values.join(", ")}`)}`
        );
      }

      console.error();
    }
  }

  console.error(pc.dim("────────────────────────────────────────────"));
  console.error(
    pc.red(
      `Validation failed with ${result.error.issues.length} error(s).`
    )
  );

  throw new Error("Card validation failed."); 
}

export const cards = validateCards();
