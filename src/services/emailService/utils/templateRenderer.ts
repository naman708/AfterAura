import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export const renderTemplate = (templateName: string, variables: Record<string, any>): string => {
  const filePath = path.join(process.cwd(), "src", "templates", `${templateName}.hbs`);
  
  const templateFile = fs.readFileSync(filePath, "utf8");

  const compiledTemplate = handlebars.compile(templateFile);
  
  return compiledTemplate(variables);
};
