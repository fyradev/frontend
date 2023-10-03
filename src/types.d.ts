declare namespace Types {
    interface CollapsibleSidebarProps {
        title: string;
        to: string;
    }

    interface User {
        id: string;
        username: string;
    }

    type AppPermissions = "admin" | "edit" | "view" | "delete" | "deploy" | "files" | "console"

    interface UserWithPermissions {
        id: string;
        username: string;
        permissions: AppPermissions[];
    }

    type WizardFieldTypes = "string" | "number" | "slider" | "switch" | "select";
    type WizardFieldTypesDataTypes = "percentage" | "bytes";
    type WizardInternalAvailSteps = "internal_template" | "internal_perms" | "internal_summary";

    interface WizardStep {
        title: string;
        error?: string;
        complete: boolean;
        internalID?: WizardInternalAvailSteps;
        internalValue?: any;
        categories: WizardCategory[];
    }

    interface WizardCategory {
        title: string;
        seperate?: boolean;
        fields: WizardField[];
    }

    interface WizardField {
        id: string;
        label: string;
        description?: string;
        type: WizardFieldTypes;
        dataType?: WizardFieldTypesDataTypes;
        required: boolean;
        dependsOn?: string;
        dependsOnValues?: any[];
        value: any;
        max?: number;
        min?: number;
        error?: string;
        options?: {
            id: string;
            label: string;
            description?: string;
        }[];
    }

    type AppStatus = "up" | "starting" | "down" | "exiting" | "unknown";

    interface App {
        status: AppStatus;
        id: string;
        name: string;
        comment: string;
        environment: string;
    }

    interface AppEnv {
        version: number;
        id: string;
        name: string;
        description?: string;
        tags: string[];
        maintainer: string;
        arguments?: {
          id: string;
          label: string;
          description: string;
          type: 'string' | 'number' | 'slider' | 'switch' | 'select';
          dataType?: 'percentage' | 'bytes';
          required: boolean;
          dependsOn?: string;
          dependsOnValues?: any[];
          value?: any;
          max?: number;
          min?: number;
          options?: {
            id: string;
            label: string;
            description?: string;
          }[];
        }[];
    }
}