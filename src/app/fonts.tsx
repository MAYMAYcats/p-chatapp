import React from 'react';
import { useFonts } from 'expo-font';

const LoadFonts = ({ children }: { children: React.ReactNode }) => {
    const [loaded] = useFonts({
        ABCMonumentGrotesk: require('../../assets/fonts/ABCMonumentGrotesk-Ultra-Trial.otf'),
    });

    if (!loaded) {
        return null; // Render nothing until fonts are loaded
    }

    return <>{children}</>; // Render children once fonts are loaded
};

export default LoadFonts;
