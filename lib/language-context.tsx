"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "fr" | "de" | "kn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    rfps: "RFP's",
    team: "Team",
    settings: "Settings",

    // Dashboard
    welcomeBack: "Welcome back, {name}!", // Interpolated
    totalRfps: "Total RFPs",
    rfpsWon: "RFPs Won",
    pendingReview: "Pending Review",
    winRate: "Win Rate",
    recentRfps: "Recent RFP's",
    viewMore: "View more",
    checkStatus: "Check Status",

    // Settings
    settingsTitle: "Settings",
    settingsSubtitle: "Customize your RFP platform experience",
    saveChanges: "Save Changes",
    profile: "Profile",
    notifications: "Notifications",
    security: "Security",
    preferences: "Preferences",
    aiSettings: "AI Settings",
    userRoles: "User & Roles",

    // Profile
    profileInfo: "Profile Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    position: "Position",

    // Language
    language: "Language",
    english: "English",
    spanish: "Spanish",
    french: "French",
    german: "German",
    kannada: "Kannada",

    // User Management
    userRoleManagement: "User & Role Management",
    manageUsersDesc: "Manage users, roles, and permissions across your organization",
    roleManagement: "Role Management",
    users: "Users",
    userLogs: "User Logs",
    addRole: "Add Role",
    addUser: "Add User",

    // Roles
    superAdmin: "Super Administrator",
    rfpAnalystManager: "RFP Analyst Manager",
    seniorAnalyst: "Senior Analyst",
    viewer: "Viewer",

    // Common
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    save: "Save",
    create: "Create",
    view: "View",
    name: "Name",
    description: "Description",
    permissions: "Permissions",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    lastLogin: "Last Login",
    role: "Role",
    actions: "Actions",
  },

  es: {
    // Navigation
    dashboard: "Panel de Control",
    rfps: "RFP's",
    team: "Equipo",
    settings: "Configuración",

    // Dashboard
    welcomeBack: "¡Bienvenido de vuelta, {name}!", // Interpolated
    totalRfps: "RFPs Totales",
    rfpsWon: "RFPs Ganados",
    pendingReview: "Revisión Pendiente",
    winRate: "Tasa de Éxito",
    recentRfps: "RFP's Recientes",
    viewMore: "Ver más",
    checkStatus: "Verificar Estado",

    // Settings
    settingsTitle: "Configuración",
    settingsSubtitle: "Personaliza tu experiencia en la plataforma RFP",
    saveChanges: "Guardar Cambios",
    profile: "Perfil",
    notifications: "Notificaciones",
    security: "Seguridad",
    preferences: "Preferencias",
    aiSettings: "Configuración IA",
    userRoles: "Usuarios y Roles",

    // Profile
    profileInfo: "Información del Perfil",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Teléfono",
    position: "Posición",

    // Language
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",
    french: "Francés",
    german: "Alemán",
    kannada: "Kannada",

    // User Management
    userRoleManagement: "Gestión de Usuarios y Roles",
    manageUsersDesc: "Gestiona usuarios, roles y permisos en tu organización",
    roleManagement: "Gestión de Roles",
    users: "Usuarios",
    userLogs: "Registros de Usuario",
    addRole: "Agregar Rol",
    addUser: "Agregar Usuario",

    // Common
    edit: "Editar",
    delete: "Eliminar",
    cancel: "Cancelar",
    save: "Guardar",
    create: "Crear",
    view: "Ver",
    name: "Nombre",
    description: "Descripción",
    permissions: "Permisos",
    status: "Estado",
    active: "Activo",
    inactive: "Inactivo",
    lastLogin: "Último Acceso",
    role: "Rol",
    actions: "Acciones",
  },

  fr: {
    // Navigation
    dashboard: "Tableau de Bord",
    rfps: "RFP's",
    team: "Équipe",
    settings: "Paramètres",

    // Dashboard
    welcomeBack: "Bon retour, {name}!", // Interpolated
    totalRfps: "RFPs Totaux",
    rfpsWon: "RFPs Gagnés",
    pendingReview: "En Attente de Révision",
    winRate: "Taux de Réussite",
    recentRfps: "RFP's Récents",
    viewMore: "Voir plus",
    checkStatus: "Vérifier le Statut",

    // Settings
    settingsTitle: "Paramètres",
    settingsSubtitle: "Personnalisez votre expérience de plateforme RFP",
    saveChanges: "Sauvegarder les Modifications",
    profile: "Profil",
    notifications: "Notifications",
    security: "Sécurité",
    preferences: "Préférences",
    aiSettings: "Paramètres IA",
    userRoles: "Utilisateurs et Rôles",

    // Profile
    profileInfo: "Informations du Profil",
    firstName: "Prénom",
    lastName: "Nom de Famille",
    email: "E-mail",
    phone: "Téléphone",
    position: "Position",

    // Language
    language: "Langue",
    english: "Anglais",
    spanish: "Espagnol",
    french: "Français",
    german: "Allemand",
    kannada: "Kannada",

    // User Management
    userRoleManagement: "Gestion des Utilisateurs et Rôles",
    manageUsersDesc: "Gérez les utilisateurs, rôles et permissions dans votre organisation",
    roleManagement: "Gestion des Rôles",
    users: "Utilisateurs",
    userLogs: "Journaux d'Utilisateur",
    addRole: "Ajouter un Rôle",
    addUser: "Ajouter un Utilisateur",

    // Common
    edit: "Modifier",
    delete: "Supprimer",
    cancel: "Annuler",
    save: "Sauvegarder",
    create: "Créer",
    view: "Voir",
    name: "Nom",
    description: "Description",
    permissions: "Permissions",
    status: "Statut",
    active: "Actif",
    inactive: "Inactif",
    lastLogin: "Dernière Connexion",
    role: "Rôle",
    actions: "Actions",
  },

  de: {
    // Navigation
    dashboard: "Dashboard",
    rfps: "RFP's",
    team: "Team",
    settings: "Einstellungen",

    // Dashboard
    welcomeBack: "Willkommen zurück, {name}!", // Interpolated
    totalRfps: "Gesamt RFPs",
    rfpsWon: "RFPs Gewonnen",
    pendingReview: "Ausstehende Überprüfung",
    winRate: "Gewinnrate",
    recentRfps: "Aktuelle RFP's",
    viewMore: "Mehr anzeigen",
    checkStatus: "Status Prüfen",

    // Settings
    settingsTitle: "Einstellungen",
    settingsSubtitle: "Passen Sie Ihre RFP-Plattform-Erfahrung an",
    saveChanges: "Änderungen Speichern",
    profile: "Profil",
    notifications: "Benachrichtigungen",
    security: "Sicherheit",
    preferences: "Einstellungen",
    aiSettings: "KI-Einstellungen",
    userRoles: "Benutzer & Rollen",

    // Profile
    profileInfo: "Profilinformationen",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon",
    position: "Position",

    // Language
    language: "Sprache",
    english: "Englisch",
    spanish: "Spanisch",
    french: "Französisch",
    german: "Deutsch",
    kannada: "Kannada",

    // User Management
    userRoleManagement: "Benutzer- & Rollenverwaltung",
    manageUsersDesc: "Verwalten Sie Benutzer, Rollen und Berechtigungen in Ihrer Organisation",
    roleManagement: "Rollenverwaltung",
    users: "Benutzer",
    userLogs: "Benutzerprotokolle",
    addRole: "Rolle Hinzufügen",
    addUser: "Benutzer Hinzufügen",

    // Common
    edit: "Bearbeiten",
    delete: "Löschen",
    cancel: "Abbrechen",
    save: "Speichern",
    create: "Erstellen",
    view: "Anzeigen",
    name: "Name",
    description: "Beschreibung",
    permissions: "Berechtigungen",
    status: "Status",
    active: "Aktiv",
    inactive: "Inaktiv",
    lastLogin: "Letzte Anmeldung",
    role: "Rolle",
    actions: "Aktionen",
  },

  kn: {
    // Navigation
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    rfps: "RFP ಗಳು",
    team: "ತಂಡ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",

    // Dashboard
    welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ, {name}!", // Interpolated
    totalRfps: "ಒಟ್ಟು RFP ಗಳು",
    rfpsWon: "ಗೆದ್ದ RFP ಗಳು",
    pendingReview: "ಪರಿಶೀಲನೆ ಬಾಕಿ",
    winRate: "ಗೆಲುವಿನ ದರ",
    recentRfps: "ಇತ್ತೀಚಿನ RFP ಗಳು",
    viewMore: "ಹೆಚ್ಚು ನೋಡಿ",
    checkStatus: "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",

    // Settings
    settingsTitle: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    settingsSubtitle: "ನಿಮ್ಮ RFP ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನುಭವವನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ",
    saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    profile: "ಪ್ರೊಫೈಲ್",
    notifications: "ಅಧಿಸೂಚನೆಗಳು",
    security: "ಭದ್ರತೆ",
    preferences: "ಆದ್ಯತೆಗಳು",
    aiSettings: "AI ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    userRoles: "ಬಳಕೆದಾರರು ಮತ್ತು ಪಾತ್ರಗಳು",

    // Profile
    profileInfo: "ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ",
    firstName: "ಮೊದಲ ಹೆಸರು",
    lastName: "ಕೊನೆಯ ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    position: "ಸ್ಥಾನ",

    // Language
    language: "ಭಾಷೆ",
    english: "ಇಂಗ್ಲಿಷ್",
    spanish: "ಸ್ಪ್ಯಾನಿಷ್",
    french: "ಫ್ರೆಂಚ್",
    german: "ಜರ್ಮನ್",
    kannada: "ಕನ್ನಡ",

    // User Management
    userRoleManagement: "ಬಳಕೆದಾರ ಮತ್ತು ಪಾತ್ರ ನಿರ್ವಹಣೆ",
    manageUsersDesc: "ನಿಮ್ಮ ಸಂಸ್ಥೆಯಲ್ಲಿ ಬಳಕೆದಾರರು, ಪಾತ್ರಗಳು ಮತ್ತು ಅನುಮತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    roleManagement: "ಪಾತ್ರ ನಿರ್ವಹಣೆ",
    users: "ಬಳಕೆದಾರರು",
    userLogs: "ಬಳಕೆದಾರ ಲಾಗ್‌ಗಳು",
    addRole: "ಪಾತ್ರ ಸೇರಿಸಿ",
    addUser: "ಬಳಕೆದಾರ ಸೇರಿಸಿ",

    // Common
    edit: "ಸಂಪಾದಿಸಿ",
    delete: "ಅಳಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    save: "ಉಳಿಸಿ",
    create: "ರಚಿಸಿ",
    view: "ನೋಡಿ",
    name: "ಹೆಸರು",
    description: "ವಿವರಣೆ",
    permissions: "ಅನುಮತಿಗಳು",
    status: "ಸ್ಥಿತಿ",
    active: "ಸಕ್ರಿಯ",
    inactive: "ನಿಷ್ಕ್ರಿಯ",
    lastLogin: "ಕೊನೆಯ ಲಾಗಿನ್",
    role: "ಪಾತ್ರ",
    actions: "ಕ್ರಿಯೆಗಳು",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string, vars?: Record<string, string>): string => {
  let str = translations[language][key as keyof (typeof translations)[typeof language]] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(new RegExp(`{${k}}`, 'g'), v);
    });
  }
  return str;
}

  // Save language preference
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
