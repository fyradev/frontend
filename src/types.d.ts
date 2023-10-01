declare namespace Types {
    interface CollapsibleSidebarProps {
        title: string;
        to: string;
    }

    interface WizardStep {
        title: string;
        error?: string;
        complete: boolean;
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
        type: 'string' | 'number' | 'slider' | 'switch';
        dataType?: 'percentage' | 'bytes';
        required: boolean;
        value: any;
        max?: number;
        min?: number;
        restriction?: 'AlphaNummeric' | 'Nummeric' | 'Text';
        error?: string;
        options?: {
            id: string;
            name: string;
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
          category?: string;
          name: string;
          description: string;
          required: boolean;
          default?: string;
          type: string;
          expandable: boolean;
          options?: {
            id: string;
            name: string;
            description: string;
          }[];
        }[];
    }
}