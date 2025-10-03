import rateLimit from "express-rate-limit";


export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,   
  max: 100,                
  message: { error: "Trop de requêtes, réessayez plus tard." },
  standardHeaders: true,
  legacyHeaders: false,
});


export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  max: 10,
  message: { error: "Trop de tentatives de connexion, réessayez plus tard." },
  standardHeaders: true,
  legacyHeaders: false,
});


export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  
  max: 5,
  message: { error: "Trop de tentatives d'inscription, réessayez plus tard." },
  standardHeaders: true,
  legacyHeaders: false,
});


export const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  
  max: 3, 
  message: { error: "Trop de demandes de réinitialisation, réessayez plus tard." },
  standardHeaders: true,
  legacyHeaders: false,
});
