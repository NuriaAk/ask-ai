# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "AgentQ" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [ref=e8]
          - generic [ref=e11]: AgentQ
        - paragraph [ref=e12]: Your friendly AI agents guide
    - main [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - button "Go back" [ref=e16] [cursor=pointer]:
            - img [ref=e17]
          - generic [ref=e19]:
            - heading "Technical Mode" [level=2] [ref=e20]
            - paragraph [ref=e21]: Detailed answers with code examples
          - button "Switch mode" [ref=e22] [cursor=pointer]
        - generic [ref=e23]:
          - generic [ref=e24]:
            - img [ref=e26]
            - generic [ref=e31]: How do agents work?
          - generic [ref=e32]:
            - img [ref=e34]
            - generic [ref=e39]: "GraphRAG response (technical): AI agents perceive inputs, reason about goals, and take actions through tools or workflows. They combine a reasoning engine, memory, and tool access to complete tasks. If you want, I can expand with architecture patterns or code examples."
        - generic [ref=e40]:
          - generic [ref=e41]:
            - 'textbox "Ask a question like: How do autonomous agents coordinate tasks?" [ref=e42]'
            - button "Send message" [disabled] [ref=e43]:
              - img [ref=e44]
          - paragraph [ref=e47]: Press Enter to send • Shift + Enter for new line
```