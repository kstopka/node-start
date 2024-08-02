import * as fs from "fs";
import * as path from "path";

const jsonFilePath = path.join(__dirname, "codes.json");

const addToJson = (newElement: string): void => {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Błąd podczas odczytu pliku:", err);
      return;
    }

    try {
      const codes: string[] = JSON.parse(data);

      codes.push(newElement);

      fs.writeFile(
        jsonFilePath,
        JSON.stringify(codes, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Błąd podczas zapisywania pliku:", err);
          } else {
            console.log("Plik został zaktualizowany pomyślnie.");
          }
        }
      );
    } catch (parseError) {
      console.error("Błąd podczas parsowania JSON:", parseError);
    }
  });
};

export { addToJson };
