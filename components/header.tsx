import React from "react"
import { Button, ButtonProps } from "@chakra-ui/button"
import { Box, Flex, HStack } from "@chakra-ui/layout"
import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/system"
import { useViewportScroll } from "framer-motion"
import { useRouter } from "next/dist/client/router"
import { ThemeButton } from "./theme-button"

interface NavLinkProps extends ButtonProps {
  to: string
}

export const NavLink: React.FC<NavLinkProps> = ({ children, to, ...rest }) => {
  const router = useRouter()

  const handleClick = () => router.push(to)
  const color = useColorModeValue("purple.500", "purple.200")

  const active = router.pathname == to

  return (
    <Button
      variant={active ? "ghost" : "solid"}
      isActive={active}
      onClick={handleClick}
      _active={{
        color: color,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}

export const Header: React.FC<HTMLChakraProps<"header">> = (props) => {
  const bg = useColorModeValue("white", "gray.800")
  const ref = React.useRef<HTMLHeadingElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useViewportScroll()
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
      {...props}
    >
      <chakra.div mx="auto" maxW="8xl">
        <Flex
          px="4"
          py="2"
          flex="1"
          justify="space-between"
          alignItems="center"
        >
          <HStack>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/links">Links</NavLink>
          </HStack>
          <Box>
            <ThemeButton />
          </Box>
        </Flex>
      </chakra.div>
    </chakra.header>
  )
}
