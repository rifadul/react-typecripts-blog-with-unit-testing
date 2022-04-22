import { render, screen } from '@testing-library/react';
import React, { ReactChild, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const componentRenderByMemoryRouter = async (
    routingPath: string | '',
    componentName: ReactElement | ReactChild
) => {
    render(
        <MemoryRouter initialEntries={[routingPath]}>
            {componentName}
        </MemoryRouter>
    );
};

export const elementGetByTestId = (testId: string) => {
    return screen.getByTestId(`${testId}`);
};

export const elementGetBytext = (text: string | number) => {
    return screen.getByText(`${text}`);
};

export const toBeExpectByTestId = (testId: string) => {
    return expect(screen.getByTestId(`${testId}`)).toBeInTheDocument();
};

export const toBeExpectByText = (text: string | number) => {
    return expect(screen.getByText(`${text}`)).toBeInTheDocument();
};
