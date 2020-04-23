import React from 'react';
import styled from 'styled-components';
import { useContent } from '../content';

const Container = styled.footer`
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightOrange};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;
  padding: ${({ theme }) => theme.spacing[7]};

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  &:last-child {
    margin-bottom: 0;
  }

  @media ${({ theme }) => theme.media.tablet} {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.spacing[7]};
    flex: 0 0 33.33%;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ListTitle = styled.p`
  display: inline;
  width: fit-content;
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[12]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  padding-bottom: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
`;

const List = styled.li`
  list-style-type: none;
`;

const FooterLink = styled.a`
  display: block;
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[12]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function mapFooterLists(footerLists, content) {
  return footerLists.split(',').map((key) => ({
    title: content[`${key}Title`],
    links: content[`${key}Links`].split('\n'),
  }));
}

export default function Footer() {
  const content = useContent();

  const {
    footerLists,
  } = content;

  return (
    <Container>
      <Content>
        {mapFooterLists(footerLists, content).map((list) => (
          <ListContainer key={list.title}>
            <ListTitle>{list.title}</ListTitle>
            {list.links.map((link) => (
              <List key={link}>
                <FooterLink href={link.split(':::')[1]}>
                  {link.split(':::')[0]}
                </FooterLink>
              </List>
            ))}
          </ListContainer>
        ))}
      </Content>
    </Container>
  );
}
