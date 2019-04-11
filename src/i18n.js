import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {reactI18nextModule} from "react-i18next";
import React from "react";

i18n
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "dashboard.ProcessedImages": "Processed Images",
                    "dashboard.Success": "Success",
                    "dashboard.Error": "Error",
                    "dashboard.Campaigns": "Campaigns"
                }
            },
            es: {
                translations: {
                    "dashboard.ProcessedImages": "Imágenes procesadas",
                    "dashboard.Success": "Sucesso",
                    "dashboard.Error": "Error",
                    "dashboard.Campaigns": "Campañas"
                }
            },
            pt: {
                translations: {
                    "dashboard.ProcessedImages": "Imagens processadas",
                    "dashboard.Success": "Sucesso",
                    "dashboard.Error": "Erro",
                    "dashboard.Campaigns": "Campanhas"
                }
            }
        },
        fallbackLng: "pt",
        debug: true,
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false,
        interpolation: {
            formatSeparator: ","
        },
        react: {
            wait: true
        }
    });

export default i18n;
